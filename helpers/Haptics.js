import * as React from 'react';
import * as Haptics from 'expo-haptics';


const haptic = (type) => {
    
    switch(type) {
        case "normal": 
            return(
                Haptics.selectionAsync()
            );
            break;
        
        case "success":
            return(
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            )
            break;

        case "error":
            return(
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
            )
            break;

        case "warning":
            return(
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
            )
            break;

        default: return (null)
            break;
    }

}
 
export default haptic;