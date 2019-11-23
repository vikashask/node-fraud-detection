
/**
 * File to add Utilities that are 
 * common and can be used at multiple places
 */
export default class Utils {
    /**
     * Function to validate atleast one Alphabets and one Character characters
     */
    static emailRegExp = (value) => {
        var emailRegExp = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(value);
    }
    
}
