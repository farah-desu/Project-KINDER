
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Parentapprove = () => {
    const [babysitters, setBabysitters] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/parentapprove')
            .then(res => setBabysitters(res.data))
            .catch(err => console.error(err));
    }, []);

   const handleAccept = (name, email, password) => {
    axios.post('http://localhost:3001/api/accept-parent', { name, email, password })
        .then(() => {
            alert(`${name} accepted!`);
            setBabysitters(prev => prev.filter(b => b.name !== name));
        })
        .catch(err => console.error(err));
};

   const handleReject = (name, email) => {
    if (window.confirm(`Are you sure you want to reject ${name}?`)) {
        axios.post('http://localhost:3001/api/reject-parent', { name, email })
            .then(() => {
                setBabysitters(prev => prev.filter(b => b.name !== name));
                alert(`${name} has been rejected.`);
            })
            .catch(err => console.error(err));
    }
};

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Parent Applications</h1>
            {babysitters.length === 0 ? (
                <div style={styles.emptyState}>No pending applications</div>
            ) : (
                <div style={styles.cardContainer}>
                    {babysitters.map(user => (
                        <div key={user.id} style={styles.card}>
                            <div style={styles.imageContainer}>
                                <img 
                                    src={`http://localhost:3001/uploads/${user.image}`} 
                                    alt={user.name} 
                                    style={styles.image}
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                                    }}
                                />
                            </div>
                            <div style={styles.content}>
                                <h3 style={styles.name}>{user.name}</h3>
                                <p style={styles.email}>{user.email}</p>
                                <p style={styles.role}>{user.role === 'babysitter' ? 'Professional Babysitter' : 'Parent'}</p>
                                
                                <div style={styles.buttonGroup}>
                                    <button 
                                        style={styles.acceptButton}
                                         onClick={() => handleAccept(user.name, user.email , user.password)}

                                    >
                                        Approve
                                    </button>
                                    <button 
                                        style={styles.rejectButton}
                                         onClick={() => handleReject(user.name, user.email)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
    },
    header: {
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '2.5rem',
        fontWeight: '600',
        borderBottom: '2px solid #3498db',
        paddingBottom: '0.5rem',
        display: 'inline-block'
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        padding: '1rem'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
        }
    },
    imageContainer: {
        height: '200px',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
        ':hover': {
            transform: 'scale(1.05)'
        }
    },
    content: {
        padding: '1.5rem'
    },
    name: {
        margin: '0 0 0.5rem 0',
        color: '#2c3e50',
        fontSize: '1.4rem'
    },
    email: {
        margin: '0 0 0.5rem 0',
        color: '#7f8c8d',
        fontSize: '0.9rem'
    },
    role: {
        margin: '0 0 1rem 0',
        color: '#3498db',
        fontWeight: '500',
        fontSize: '0.95rem'
    },
    buttonGroup: {
        display: 'flex',
        gap: '0.8rem',
        marginTop: '1rem'
    },
    acceptButton: {
        flex: '1',
        padding: '0.6rem',
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'background-color 0.2s ease',
        ':hover': {
            backgroundColor: '#27ae60'
        }
    },
    rejectButton: {
        flex: '1',
        padding: '0.6rem',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'background-color 0.2s ease',
        ':hover': {
            backgroundColor: '#c0392b'
        }
    },
    emptyState: {
        textAlign: 'center',
        color: '#7f8c8d',
        fontSize: '1.2rem',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }
}

export default Parentapprove