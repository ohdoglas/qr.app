import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../../css/styles/public/History.css";
import api from "../../api";

interface QRCodeHistoryItem {
    url: string;
    imageUrl: string;
    createdAt: string;
    scanCount: number;
}

const History: React.FC = () => {
    const [history, setHistory] = useState<QRCodeHistoryItem[]>([]);
    const [filteredHistory, setFilteredHistory] = useState<QRCodeHistoryItem[]>([]);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [page, setPage] = useState(1);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            const response = await api.get("/history");
            setHistory(response.data.history);
            setFilteredHistory(response.data.history);
        };
        fetchHistory();
    }, []);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        });
        if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);
    }, [loadMoreRef]);

    const handleFilter = () => {
        let filtered = [...history];

        if (search) {
            filtered = filtered.filter(item => item.url.toLowerCase().includes(search.toLowerCase()));
        }
        if (startDate) {
            filtered = filtered.filter(item => new Date(item.createdAt) >= new Date(startDate));
        }
        if (endDate) {
            filtered = filtered.filter(item => new Date(item.createdAt) <= new Date(endDate));
        }

        setFilteredHistory(filtered);
    };

    return (
        <div>
            <Header />
            <main className="main_history_content">
            <div className="history_qrcodes_img"></div>
                <h1 className="title">Public QR Code History</h1>
                <div className="filters_box">
                    <input
                        type="text"
                        placeholder="Search keywords..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                    <button onClick={handleFilter}>Filter</button>
                </div>

                <div className="table_box">
                    <table>
                        <thead>
                            <tr>
                                <th>QR Code</th>
                                <th>URL / Name</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHistory.slice(0, page * 10).map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={item.imageUrl}
                                            width={100}
                                            height={100}
                                            alt="QR Code"
                                        />
                                    </td>
                                    <td title={item.url}>
                                        <a href={item.url} target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>
                                            {item.url.length > 40 ? item.url.slice(0, 37) + "..." : item.url}
                                        </a>
                                    </td>
                                    <td>
                                        {new Date(item.createdAt).toLocaleString("en-US")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div ref={loadMoreRef} style={{ height: "50px" }}></div>
            </main>
            <Footer />
        </div>
    );
};

export default History;
