import { useMemo, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import api from "../../api";
import { useLanguage } from "../../i18n/useLanguage";
import "../../css/styles/public/History.css";

type HistoryStatus = "idle" | "loading" | "loaded" | "error";

interface QRCodeHistoryItem {
    url: string;
    imageUrl: string;
    createdAt: string;
}

function parseHistoryItems(value: unknown): QRCodeHistoryItem[] {
    if (!Array.isArray(value)) throw new Error("Unexpected history response");

    return value.flatMap((entry) => {
        if (typeof entry !== "object" || entry === null) return [];
        const record = entry as Record<string, unknown>;
        const createdAt = typeof record.createdAt === "string" ? record.createdAt : "";
        if (typeof record.url !== "string" || !createdAt || Number.isNaN(Date.parse(createdAt))) return [];

        return [{
            url: record.url,
            imageUrl: typeof record.imageUrl === "string" ? record.imageUrl : "",
            createdAt,
        }];
    });
}

function safeHttpUrl(value: string): string | null {
    try {
        const parsed = new URL(value);
        return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : null;
    } catch {
        return null;
    }
}

function safeImageUrl(value: string): string | null {
    try {
        const parsed = new URL(value);
        if (parsed.protocol === "https:") return parsed.href;
        const isLoopback = ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
        return parsed.protocol === "http:" && isLoopback ? parsed.href : null;
    } catch {
        return null;
    }
}

function formatCreatedAt(value: string, language: "en" | "pt"): string {
    const date = new Date(value);
    return new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

const History = () => {
    const { language, t } = useLanguage();
    const [history, setHistory] = useState<QRCodeHistoryItem[]>([]);
    const [status, setStatus] = useState<HistoryStatus>("idle");
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);

    const loadHistory = async () => {
        setStatus("loading");
        try {
            const response = await api.get("/history");
            setHistory(parseHistoryItems(response.data?.history));
            setVisibleCount(10);
            setStatus("loaded");
        } catch {
            setStatus("error");
        }
    };

    const filteredHistory = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
        const end = endDate ? new Date(`${endDate}T23:59:59.999`) : null;

        return history.filter((item) => {
            const created = new Date(item.createdAt);
            const matchesSearch = !normalizedSearch || item.url.toLowerCase().includes(normalizedSearch);
            const matchesStart = !start || created >= start;
            const matchesEnd = !end || created <= end;
            return matchesSearch && matchesStart && matchesEnd;
        });
    }, [endDate, history, search, startDate]);

    const clearFilters = () => {
        setSearch("");
        setStartDate("");
        setEndDate("");
        setVisibleCount(10);
    };

    return (
        <div className="history-page">
            <Header />
            <main className="history-main">
                <section className="history-heading" aria-labelledby="history-title">
                    <p className="history-eyebrow">{t("history.eyebrow")}</p>
                    <h1 id="history-title">{t("history.title")}</h1>
                    <p>{t("history.intro")}</p>
                </section>

                <section className="history-panel" aria-label={t("history.panel")}>
                    <div className="history-data-notice">
                        <span className="history-notice-icon" aria-hidden="true">i</span>
                        <p>{t("history.dataNotice")}</p>
                    </div>

                    {status === "idle" && (
                        <div className="history-state-card">
                            <span className="history-state-mark" aria-hidden="true">↗</span>
                            <h2>{t("history.idleTitle")}</h2>
                            <p>{t("history.idleText")}</p>
                            <button className="history-primary-button" type="button" onClick={loadHistory}>{t("history.load")}</button>
                        </div>
                    )}

                    {status === "loading" && (
                        <div className="history-state-card" role="status" aria-live="polite">
                            <span className="history-spinner" aria-hidden="true" />
                            <h2>{t("history.loadingTitle")}</h2>
                            <p>{t("history.loadingText")}</p>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="history-state-card history-error" role="alert">
                            <span className="history-state-mark" aria-hidden="true">!</span>
                            <h2>{t("history.errorTitle")}</h2>
                            <p>{t("history.errorText")}</p>
                            <button className="history-primary-button" type="button" onClick={loadHistory}>{t("history.retry")}</button>
                        </div>
                    )}

                    {status === "loaded" && history.length === 0 && (
                        <div className="history-state-card">
                            <span className="history-state-mark" aria-hidden="true">⌕</span>
                            <h2>{t("history.emptyTitle")}</h2>
                            <p>{t("history.emptyText")}</p>
                            <button className="history-secondary-button" type="button" onClick={loadHistory}>{t("history.refreshList")}</button>
                        </div>
                    )}

                    {status === "loaded" && history.length > 0 && (
                        <>
                            <div className="history-toolbar">
                                <div className="history-filter-field history-search-field">
                                    <label htmlFor="history-search">{t("history.search")}</label>
                                    <input id="history-search" type="search" value={search} onChange={(event) => { setSearch(event.target.value); setVisibleCount(10); }} placeholder={t("history.searchPlaceholder")} />
                                </div>
                                <div className="history-filter-field">
                                    <label htmlFor="history-from">{t("history.from")}</label>
                                    <input id="history-from" type="date" value={startDate} onChange={(event) => { setStartDate(event.target.value); setVisibleCount(10); }} />
                                </div>
                                <div className="history-filter-field">
                                    <label htmlFor="history-to">{t("history.through")}</label>
                                    <input id="history-to" type="date" value={endDate} onChange={(event) => { setEndDate(event.target.value); setVisibleCount(10); }} />
                                </div>
                                <button className="history-secondary-button history-refresh-button" type="button" onClick={loadHistory}>{t("history.refresh")}</button>
                            </div>

                            <div className="history-list-header">
                                <p role="status" aria-live="polite">{t(filteredHistory.length === 1 ? "history.countOne" : "history.countMany", { count: new Intl.NumberFormat(language === "pt" ? "pt-BR" : "en-US").format(filteredHistory.length) })}</p>
                                {(search || startDate || endDate) && <button type="button" className="history-clear-button" onClick={clearFilters}>{t("history.clearFilters")}</button>}
                            </div>

                            {filteredHistory.length > 0 ? (
                                <div className="history-list">
                                    {filteredHistory.slice(0, visibleCount).map((item, index) => {
                                        const destination = safeHttpUrl(item.url);
                                        const image = safeImageUrl(item.imageUrl);
                                        return (
                                            <article className="history-item" key={`${item.createdAt}-${item.url}-${index}`}>
                                                <div className="history-item-image">
                                                    {image ? <img src={image} alt={t("history.imageAlt")} loading="lazy" decoding="async" referrerPolicy="no-referrer" /> : <span>{t("history.imageUnavailable")}</span>}
                                                </div>
                                                <div className="history-item-details">
                                                    <p className="history-item-date">{t("history.created", { date: formatCreatedAt(item.createdAt, language) })}</p>
                                                    <h2>{destination ? <a href={destination} target="_blank" rel="noopener noreferrer">{item.url}</a> : item.url}</h2>
                                                    <p className="history-item-privacy">{t("history.privacy")}</p>
                                                </div>
                                                {destination && <a className="history-open-link" href={destination} target="_blank" rel="noopener noreferrer" aria-label={t("history.openLabel")}>{t("history.open")} <span aria-hidden="true">↗</span></a>}
                                            </article>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="history-empty-filter">
                                    <h2>{t("history.noMatches")}</h2>
                                    <p>{t("history.noMatchesText")}</p>
                                    <button type="button" className="history-secondary-button" onClick={clearFilters}>{t("history.clearFilters")}</button>
                                </div>
                            )}

                            {filteredHistory.length > visibleCount && (
                                <button className="history-load-more" type="button" onClick={() => setVisibleCount((count) => count + 10)}>{t("history.loadMore")}</button>
                            )}
                        </>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default History;
