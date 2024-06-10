export interface PasswordValidationResult {
    isStrong: boolean;
    errorMessage: string;
}

export function validatePassword(password: string): PasswordValidationResult {
    if (password === "") {
        return { isStrong: false, errorMessage: "Please enter a password" };
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUppercase) {
        return {
            isStrong: false,
            errorMessage: "Passwords must contain an uppercase letter",
        };
    }
    if (!hasLowercase) {
        return {
            isStrong: false,
            errorMessage: "Passwords must contain a lowercase letter",
        };
    }
    if (!hasDigit) {
        return {
            isStrong: false,
            errorMessage: "Passwords must contain a digit",
        };
    }
    if (!hasSpecialChar) {
        return {
            isStrong: false,
            errorMessage: "Passwords must contain a special character",
        };
    }

    return { isStrong: true, errorMessage: "" };
}
