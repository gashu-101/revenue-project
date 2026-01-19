
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [number, setNumber] = useState('');
    const navigate = useNavigate();

    const handleCheck = (e) => {
        e.preventDefault();
        if (number.trim()) {
            navigate(`/receipt/${number.trim()}`);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Times New Roman, serif'
        }}>
            <form onSubmit={handleCheck} style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Enter Receipt Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    style={{
                        padding: '10px 20px',
                        fontSize: '18px',
                        textAlign: 'center',
                        width: '250px'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 30px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        fontFamily: 'Times New Roman, serif'
                    }}
                >
                    Check Receipt
                </button>
            </form>
        </div>
    );
}
