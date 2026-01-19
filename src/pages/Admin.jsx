
import React, { useState, useEffect } from 'react';
import { ReceiptService } from '../services/ReceiptService';
import { QRCodeSVG } from 'qrcode.react';

export default function Admin() {
    const [auth, setAuth] = useState(false);
    const [password, setPassword] = useState('');

    const [receipts, setReceipts] = useState([]);
    const [editing, setEditing] = useState(null); // null or receipt object

    // Form State
    const [form, setForm] = useState({
        receiptNumber: '',
        invoiceNumber: '',
        vatNumber: '',
        tinNumber: '',
        enterpriseName: ''
    });

    useEffect(() => {
        if (auth) {
            loadReceipts();
        }
    }, [auth]);

    const loadReceipts = () => {
        setReceipts(ReceiptService.getAll());
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setAuth(true);
        } else {
            alert('Invalid Password');
        }
    };

    const handleEdit = (receipt) => {
        setEditing(receipt);
        setForm(receipt);
    };

    const handleDelete = (rNumber) => {
        if (window.confirm('Delete this receipt?')) {
            ReceiptService.delete(rNumber);
            loadReceipts();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            ReceiptService.update(editing.receiptNumber, form);
            setEditing(null);
        } else {
            if (ReceiptService.getByNumber(form.receiptNumber)) {
                alert('Receipt Number already exists!');
                return;
            }
            ReceiptService.add(form);
        }
        setForm({
            receiptNumber: '',
            invoiceNumber: '',
            vatNumber: '',
            tinNumber: '',
            enterpriseName: ''
        });
        loadReceipts();
    };

    if (!auth) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3>Admin Login</h3>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ padding: '5px' }}
                    />
                    <button type="submit" style={{ padding: '5px' }}>Login</button>
                </form>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Admin Panel</h2>

            <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc' }}>
                <h3>{editing ? 'Edit Receipt' : 'Add New Receipt'}</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <label>Receipt #</label>
                        <input
                            required
                            style={{ width: '100%' }}
                            value={form.receiptNumber}
                            onChange={e => setForm({ ...form, receiptNumber: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Invoice #</label>
                        <input
                            required
                            style={{ width: '100%' }}
                            value={form.invoiceNumber}
                            onChange={e => setForm({ ...form, invoiceNumber: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>VAT #</label>
                        <input
                            required
                            style={{ width: '100%' }}
                            value={form.vatNumber}
                            onChange={e => setForm({ ...form, vatNumber: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>TIN #</label>
                        <input
                            required
                            style={{ width: '100%' }}
                            value={form.tinNumber}
                            onChange={e => setForm({ ...form, tinNumber: e.target.value })}
                        />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label>Enterprise Name</label>
                        <input
                            required
                            style={{ width: '100%' }}
                            value={form.enterpriseName}
                            onChange={e => setForm({ ...form, enterpriseName: e.target.value })}
                        />
                    </div>

                    <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
                            {editing ? 'Update Receipt' : 'Add Receipt'}
                        </button>
                        {editing && (
                            <button
                                type="button"
                                onClick={() => { setEditing(null); setForm({ receiptNumber: '', invoiceNumber: '', vatNumber: '', tinNumber: '', enterpriseName: '' }); }}
                                style={{ marginLeft: '10px', padding: '8px 16px' }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', background: '#f0f0f0' }}>
                        <th style={{ padding: '10px' }}>Receipt #</th>
                        <th style={{ padding: '10px' }}>Enterprise</th>
                        <th style={{ padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map(r => (
                        <tr key={r.receiptNumber} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>{r.receiptNumber}</td>
                            <td style={{ padding: '10px' }}>{r.enterpriseName}</td>
                            <td style={{ padding: '10px' }}>
                                <button onClick={() => window.open(`/receipt/${r.receiptNumber}`, '_blank')} style={{ marginRight: '5px' }}>View</button>
                                <button onClick={() => handleEdit(r)} style={{ marginRight: '5px' }}>Edit</button>
                                <button onClick={() => handleDelete(r.receiptNumber)} style={{ color: 'red' }}>Delete</button>
                                <div style={{ marginTop: '10px' }}>
                                    <QRCodeSVG value={`https://erca-gov-et.vercel.app/receipt/${r.receiptNumber}`} size={64} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
