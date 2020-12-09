export const required = value => {
    if (!value) return 'Please fill all fields...';
    return undefined;
}