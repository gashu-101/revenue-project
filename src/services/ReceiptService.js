
const DEFAULTS = {
  "receipts": [
    {
      "receiptNumber": "13278",
      "invoiceNumber": "0079780523",
      "vatNumber": "19586101429",
      "tinNumber": "4239681429",
      "enterpriseName": "BERHANENA SELAM PRINTING ENTERPRISE"
    }
  ]
};

const STORAGE_KEY = 'receipt_data';

export const ReceiptService = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
    }
  },

  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data).receipts : [];
  },

  getByNumber: (number) => {
    const receipts = ReceiptService.getAll();
    return receipts.find(r => r.receiptNumber === number);
  },

  add: (receipt) => {
    const receipts = ReceiptService.getAll();
    receipts.push(receipt);
    ReceiptService.save(receipts);
  },

  update: (oldNumber, updatedReceipt) => {
    let receipts = ReceiptService.getAll();
    const index = receipts.findIndex(r => r.receiptNumber === oldNumber);
    if (index !== -1) {
      receipts[index] = updatedReceipt;
      ReceiptService.save(receipts);
    }
  },

  delete: (number) => {
    let receipts = ReceiptService.getAll();
    receipts = receipts.filter(r => r.receiptNumber !== number);
    ReceiptService.save(receipts);
  },

  save: (receipts) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ receipts }));
  }
};

// Initialize immediately
ReceiptService.init();
