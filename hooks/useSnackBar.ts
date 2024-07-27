
import Snackbar from "react-native-snackbar";

type Message = {
    message: string,
    type: "ERROR" | "SUCCESS" | "WARNING"
    duration?: number | undefined
}
const messageColors = {
    "ERROR": "red",
    "SUCCESS": "green",
    "WARNING": "grey"
}
const useSnackBar = (message: Message) => {

    Snackbar.show({
        text: message.message,
        textColor: messageColors[message.type],
        duration: message.duration ? message.duration : Snackbar.LENGTH_SHORT
    })
}
export default useSnackBar