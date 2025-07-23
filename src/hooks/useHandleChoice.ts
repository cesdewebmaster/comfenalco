import { useEffect, useState } from "react";
import useBrowserMode from "../shared/hooks/useBrowserMode";
import sendVote from '../services/rating-article.services';

export const useHandleChoice = (articleId: string,) => {

    const { window, localStorage } = useBrowserMode();

    const [choices, setChoices] = useState([
        { name: 'Sí', value: true },
        { name: 'No', value: false }
    ]);
    const [selectedChoice, setSelectedChoice] = useState<any>({});


    useEffect(() => {
        const choicesFromLocalStorage = JSON.parse(localStorage?.getItem('choices') || '[]');
        if (choicesFromLocalStorage && choicesFromLocalStorage.length > 0) {
            const alreadyChoice = choicesFromLocalStorage.find((choiceLS: any) => {
                if (choiceLS.path === window?.location?.pathname || choiceLS.path === `${window?.location?.pathname}/`) {
                    return choiceLS;
                }
            });
            if (alreadyChoice) {
                const selectedChoice = choices.filter(ch => ch.value === alreadyChoice.value)
                setChoices(selectedChoice)
                setSelectedChoice(selectedChoice[0]);
            }
        }
    }, [])

    const handleChoice = (choice: boolean) => {
        const choicesFromLocalStorage = JSON.parse(localStorage?.getItem('choices') || '[]');

        if (choicesFromLocalStorage.length < 1) {
            localStorage.setItem('choices', JSON.stringify([
                { value: choice, path: window.location.pathname }
            ]));
        } else {
            choicesFromLocalStorage.push({ value: choice, path: window.location.pathname });
            localStorage.setItem('choices', JSON.stringify(choicesFromLocalStorage));
        }

        const selectedChoice = choices.filter(ch => ch.value === choice);

        setChoices(selectedChoice);
        setSelectedChoice(selectedChoice[0]);

        const choiceData = {
            contentfulId: articleId,
            qualification: choice,
            locale: 'en-US'
        }

        sendVote(choiceData);
    }

    return {
        choices,
        selectedChoice,
        handleChoice
    }
}


