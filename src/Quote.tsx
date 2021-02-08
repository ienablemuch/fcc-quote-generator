import { useRef, useEffect } from "react";

interface IQuoteProps {
    colorTheme: string;
    onColorRequestChange(): void;
}

export function Quote({ colorTheme, onColorRequestChange }: IQuoteProps) {
    const messageRef = useRef(null);
    const authorRef = useRef(null);

    function handleNewQuote() {
        const messageElement: any = messageRef.current;
        const authorElement: any = authorRef.current;

        messageElement.addEventListener(
            "transitionend",
            handleOpacityTransition
        );

        messageElement.style.opacity = 0;
        authorElement.style.opacity = 0;

        function handleOpacityTransition(ev: any, data: any) {
            messageElement.removeEventListener(
                "transitionend",
                handleOpacityTransition
            );

            onColorRequestChange();
            messageElement.style.opacity = 1;
            authorElement.style.opacity = 1;
        }
    }

    return (
        <div className="quote">
            <div
                className="message"
                style={{ color: colorTheme }}
                ref={messageRef}
            >
                Message here
            </div>
            <div
                className="author"
                style={{ color: colorTheme }}
                ref={authorRef}
            >
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
                    onClick={handleNewQuote}
                >
                    New Quote
                </button>
            </div>
        </div>
    );
}
