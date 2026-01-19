
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ReceiptService } from '../services/ReceiptService';

export default function Receipt() {
    const { receiptNumber } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const found = ReceiptService.getByNumber(receiptNumber);
        setData(found);
        setLoading(false);
    }, [receiptNumber]);

    if (loading) return null;

    if (!data) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '100px',
                fontFamily: 'Times New Roman, serif',
                fontWeight: 'bold',
                fontSize: '24px'
            }}>
                INVALID RECEIPT
            </div>
        );
    }

    // Styles for strict replication
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: '"Times New Roman", Times, serif',
        color: 'black',
        backgroundColor: 'white',
        padding: '20px',
        maxWidth: '400px', // Approximate receipt width
        margin: '0 auto',
        lineHeight: '1.2'
    };

    const boldStyle = {
        fontWeight: 'bold'
    };

    const largeStyle = {
        fontSize: '18px',
        fontWeight: 'bold'
    };

    const blankLine = {
        height: '1.2em'
    };

    return (
        <div style={containerStyle}>
            <div style={largeStyle}>Ministry of Revenue: Valid Receipt</div>

            <div style={blankLine}></div>

            <div>የደረሰኝ መለያ ቁጥር: {data.receiptNumber}</div>
            <div>የግብር ክፍያ መለያ ቁጥር: {data.invoiceNumber}</div>

            <div style={blankLine}></div>

            <div>የደረሰኝ አይነት: CASH SALES</div>
            <div>INVOICE/VAT</div>

            <div style={blankLine}></div>

            <div>የግብር ክፍያ ቢሮ: የሰሜን ምዕራብ አዲስ አበባ አነስተኛ ግብር ከፋዮች ቅርንጫፍ</div>
            <div>የግብር ክፍያ ቢሮ</div>

            <div style={blankLine}></div>

            <div style={boldStyle}>MOR-NORTH</div>
            <div style={boldStyle}>WEST ADDIS ABEBA SMALL TAX</div>
            <div style={boldStyle}>PAYERS BRANCH</div>

            <div style={blankLine}></div>

            <div>ቫት/VAT/ መለያ ቁጥር: {data.vatNumber}</div>
            <div>ቲን/TIN/ ቁጥር: {data.tinNumber}</div>

            <div style={blankLine}></div>

            <div>የንግድ ተቋም ስም: {data.enterpriseName}</div>

            <div style={blankLine}></div>
            <div style={blankLine}></div>
        </div>
    );
}
