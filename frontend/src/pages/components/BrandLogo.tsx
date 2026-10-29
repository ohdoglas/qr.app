import { useId } from "react";

type BrandLogoProps = {
    className?: string;
    markOnly?: boolean;
};

const BrandLogo = ({ className = "", markOnly = false }: BrandLogoProps) => {
    const gradientId = `qrapp-brand-gradient-${useId().replace(/:/g, "")}`;

    return (
        <span className={`qrapp-logo${className ? ` ${className}` : ""}`}>
            <svg className="qrapp-logo-symbol" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#2878ff" />
                    </linearGradient>
                </defs>
                <rect width="40" height="40" rx="12" fill={`url(#${gradientId})`} />
                <path fill="#fff" fillRule="evenodd" d="M7 7h11v11H7zm3 3v5h5v-5zm12-3h11v11H22zm3 3v5h5v-5zM7 22h11v11H7zm3 3v5h5v-5z" />
                <path fill="#fff" d="M22 22h4v4h-4zm7 0h4v4h-4zm-7 7h4v4h-4zm7 0h4v4h-4z" />
            </svg>
            {!markOnly && <span className="qrapp-logo-wordmark">QR.APP</span>}
        </span>
    );
};

export default BrandLogo;
