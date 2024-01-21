export const update = ({key, newValue, setObject}) => {
    setObject(prev => ({
        ...prev,
        
        [key]: key == 'elementary' ? parseInt(newValue) : newValue
    }))
}