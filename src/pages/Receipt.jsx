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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '100px',
                    fontFamily: '"Times New Roman", Times, serif',
                    fontWeight: 'bold',
                    fontSize: '32px',
                    color: 'black'
                }}
            >
                INVALID RECEIPT
            </div>
        );
    }

    // Updated styles to match first image exactly
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: '"Times New Roman", Times, serif',
        color: 'black',
        backgroundColor: 'white',
        padding: '20px',
        maxWidth: '500px',
        margin: '0 auto',
        lineHeight: '1.15',
        fontWeight: 'bold',
        fontSize: '22px',
        WebkitFontSmoothing: 'antialiased',
        textRendering: 'optimizeLegibility'
    };

    const titleStyle = {
        fontSize: '30px',
        fontWeight: 'bold'
    };

    const branchStyle = {
        fontSize: '24px',
        fontWeight: 'bold'
    };

    const blankLine = {
        height: '0.7em'
    };

    return (
        <div style={containerStyle}>
            <div style={titleStyle}>
                Ministry of Revenue: Valid Receipt
            </div>

            <div style={blankLine}></div>

            <div>የደረሰኝ መለያ ቁጥር: {data.receiptNumber}</div>
            <div>የግብር ክፍያ መለያ ቁጥር: {data.invoiceNumber}</div>

            <div style={blankLine}></div>

            <div>የደረሰኝ አይነት: CASH SALES</div>
            <div>INVOICE/VAT</div>

            <div style={blankLine}></div>

            <div>
                የግብር ክፍያ ቢሮ: የሰሜን ምስራቅ አዲስ አበባ አነስተኛ ግብር ከፋዮች
            </div>
            <div>ቅርንጫፍ</div>

            <div style={blankLine}></div>

            <div style={branchStyle}>MOR-NORTH</div>
            <div style={branchStyle}>EAST ADDIS ABEBA SMALL TAX</div>
            <div style={branchStyle}>PAYERS BRANCH</div>

            <div style={blankLine}></div>

            <div>ቫት/VAT/ መለያ ቁጥር: {data.vatNumber}</div>
            <div>የቫት/VAT/ ቁጥር: {data.tinNumber}</div>

            <div style={blankLine}></div>

            <div>
                የንግድ ተቋም ስም: {data.enterpriseName}
            </div>

            <div style={blankLine}></div>

            {/* Optional QR code at bottom
            {receiptNumber && (
                <QRCodeSVG
                    value={receiptNumber}
                    size={80}
                    style={{ marginTop: '10px' }}
                />
            )} */}
        </div>
    );
}
