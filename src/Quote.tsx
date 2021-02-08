interface IQuoteProps {
    colorTheme: string;
}

export function Quote({ colorTheme }: IQuoteProps) {
    return (
        <div className="quote">
            <div className="message" style={{ color: colorTheme }}>
                Message here
            </div>
            <div className="author" style={{ color: colorTheme }}>
                Author here
            </div>
            <div className="buttons">
                <div className="button" style={{ backgroundColor: colorTheme }}>
                    Twitter
                </div>
                <div className="button" style={{ backgroundColor: colorTheme }}>
                    New Quote
                </div>
            </div>
        </div>
    );
}
