import { useRef, useEffect, useState } from "react";

import usePrevious from "@react-hook/previous";

interface IQuoteProps {
    colorTheme: string;
    onColorRequestChange(): void;
}

interface IQuote {
    quote: string;
    author: string;
}

let n = 0;

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

    console.log(JSON.stringify(n));
    ++n;

    const prevColorTheme = usePrevious(colorTheme);

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

        onColorRequestChange();
        messageElement.style.opacity = 0;
        authorElement.style.opacity = 0;

        function handleOpacityTransitionEnd(ev: any, data: any) {
            messageElement.removeEventListener(
                "transitionend",
                handleOpacityTransitionEnd
            );

            randomizeQuote();

            messageElement.style.opacity = 1;
            authorElement.style.opacity = 1;
        }
    }

    return (
        <div className="quote">
            {prevColorTheme} - {colorTheme}
            <div
                className="message"
                style={{ color: prevColorTheme }}
                ref={messageRef}
            >
                {randomQuote.quote}
            </div>
            <div
                className="author"
                style={{ color: prevColorTheme }}
                ref={authorRef}
            >
                {randomQuote.author}
            </div>
            <div className="buttons">
                <a
                    href="https://twitter.com/ienablemuch"
                    className="button"
                    style={{ backgroundColor: colorTheme }}
                >
                    <i className="fa fa-twitter"></i>
                </a>
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
