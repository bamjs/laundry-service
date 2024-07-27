import { Alert, View } from "react-native"

const DeleteDailog = (onOk, onCancel, notificationId?) => Alert.alert(
    '',
    'Are you sure you want to delete? ' + notificationId,
    [
        { text: 'Cancel', onPress: () => onCancel(), style: 'cancel' },
        { text: 'OK', onPress: () => onOk() },
    ],
    { cancelable: false }
)
export default DeleteDailog