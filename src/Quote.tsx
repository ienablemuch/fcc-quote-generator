interface IQuoteProps {
    colorTheme: string;
    onColorRequestChange(): void;
}

export function Quote({ colorTheme, onColorRequestChange }: IQuoteProps) {
    return (
        <div className="quote">
            <div className="message" style={{ color: colorTheme }}>
                Message here
            </div>
            <div className="author" style={{ color: colorTheme }}>
                Author here
            </div>
            <div className="buttons">
                <button
                    className="button"
                    style={{ backgroundColor: colorTheme }}
                >
                    Twitter
                </button>
                <button
                    className="button"
                    style={{ backgroundColor: colorTheme }}
                    onClick={onColorRequestChange}
                >
                    New Quote
                </button>
            </div>
        </div>
    );
}
