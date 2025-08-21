import { useState } from 'react';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!username || !email || !password) {
            setError('All fields are required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        // If validation passes
        setError('');
        console.log({ username, email, password });
        alert('Form submitted successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
