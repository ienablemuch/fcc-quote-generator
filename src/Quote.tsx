import { useRef, useEffect, useState } from "react";

interface IQuoteProps {
    colorTheme: string;
    onColorRequestChange(): void;
}

interface IQuote {
    quote: string;
    author: string;
}

export function Quote({ colorTheme, onColorRequestChange }: IQuoteProps) {
    const messageRef = useRef(null);
    const authorRef = useRef(null);

    const [data, setData] = useState<{
        quotes: IQuote[];
    }>({ quotes: [] });

    const [randomQuote, setRandomQuote] = useState<IQuote>({
        quote: "",
        author: "",
    });

    useEffect(() => {
        async function fetchData() {
            const result = await fetch(
                "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
            );

            setData(await result.json());
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (data.quotes.length === 0) {
            return;
        }

        randomizeQuote();
    }, [data]);

    function randomizeQuote() {
        const newRandomQuote = Math.floor(Math.random() * data.quotes.length);

        setRandomQuote(data.quotes[newRandomQuote]);
    }

    function handleNewQuote() {
        const messageElement: any = messageRef.current;
        const authorElement: any = authorRef.current;

        messageElement.addEventListener(
            "transitionend",
            handleOpacityTransitionEnd
        );

        messageElement.style.opacity = 0;
        authorElement.style.opacity = 0;

        function handleOpacityTransitionEnd(ev: any, data: any) {
            messageElement.removeEventListener(
                "transitionend",
                handleOpacityTransitionEnd
            );

            randomizeQuote();
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
                {randomQuote.quote}
            </div>
            <div
                className="author"
                style={{ color: colorTheme }}
                ref={authorRef}
            >
                {randomQuote.author}
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
