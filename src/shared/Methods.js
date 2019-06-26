import { DatePickerAndroid, Alert } from 'react-native';

const monthStrings = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export const ANDROID_DATE_PICKER = async (selectedDate) => {
    try {
        const { action, year, month, day } = await DatePickerAndroid.open({
            date: selectedDate
        });

        if (action !== DatePickerAndroid.dismissedAction) {
            // return `${day}/${monthStrings[month]}/${year}`;
            const mont = month + 1;
            return `${year}-${mont}-${day}`;
        }

        return '';
    } catch ({code, message}) {
        Alert.alert(code, message);
        return '';
    }
};

export const LOGGER = (key, whatToLog) => {
    console.log(key.toUpperCase(), whatToLog);
};
