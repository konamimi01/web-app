import React, {useState, useEffect} from 'react';
import CryptoJS from 'crypto-js'
import yaml from 'js-yaml';
import sanitizeHtml from 'sanitize-html'


const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        const yamlPath = `${process.env.PUBLIC_URL}/Data/questions.enc`;
        fetch(yamlPath)
            .then((response) => {
                return response.text();
            })
            .then((enctext) => {
                const bytes = CryptoJS.AES.decrypt(enctext, 'ABBCCCDDDDEEEEEFFFFFF');
                const dectext = bytes.toString(CryptoJS.enc.Utf8);
                const data = yaml.load(dectext);
                const shuffledQuestions = shuffleArray(data.questions);
                setQuestions(shuffledQuestions);
            })
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length -1; i>0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const handleOptionChange = (option) => {
        setSelectedOptions((prev) => {
            if (prev.includes(option)) {
                return prev.filter((item) => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    const handleSubmit = () => {
        const correctAnswers = questions[currentQuestion].answer;
        const isAnswerCorrect = correctAnswers.every((answer) => selectedOptions.includes(answer)) && selectedOptions.every((option) => correctAnswers.includes(option));
        setIsCorrect(isAnswerCorrect);
        setShowAnswer(true);
    };

    const handleNextQuestion = () => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOptions([]);
        setShowAnswer(false);
    }

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedOptions([]);
        setShowAnswer(false);
        const shuffledQuestions = shuffleArray(questions);
        setQuestions(shuffledQuestions);
    }

    if (questions.length === 0 ) return <div>Loading...</div>;

    const question = questions[currentQuestion];

    const cleanQuestion = sanitizeHtml(question.question, {
        allowedTags: ['br'],
        allowedAttributes: {}
    });

    return (
        <>
            <div>
                <h3 dangerouslySetInnerHTML={{__html: cleanQuestion}}></h3>
                {question.options.map((option, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleOptionChange(option)}
                            />
                            {option}
                        </label>
                    </div>
                ))}
                <br />
                <button onClick={handleSubmit}>回答</button>
                {showAnswer && (
                    <div>
                        <h3>正解：{Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}</h3>
                        <p>{isCorrect ? "正解" : "不正解"}</p>
                        <p>{question.explanation}</p>
                        {currentQuestion < questions.length - 1 ? (
                            <button onClick={handleNextQuestion}>次の問題</button>
                        ) : (
                            <button onClick={handleRestart}>最初から</button> 
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Quiz;