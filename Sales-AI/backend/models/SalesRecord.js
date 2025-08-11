// Sales record model for Sales AI
import mongoose from 'mongoose';

const SalesRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Sales Record Fields
  saleId: { type: String },
  dateOfSale: { type: Date, required: true },
  productName: { type: String, required: true },
  productCategory: { type: String },
  quantitySold: { type: Number, default: 1 },
  unitPrice: { type: Number },
  totalSaleAmount: { type: Number },
  discountsApplied: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  // Customer Fields
  customerName: { type: String, required: true },
  customerEmail: { type: String },
  customerPhone: { type: String },
  customerLocation: { type: String },
  customerType: { type: String, enum: ['New', 'Returning', 'Lead', 'Prospect'], default: 'Lead' },
  // Sales Process Fields
  salespersonName: { type: String },
  leadSource: { type: String, enum: ['Website', 'Referral', 'Email', 'Phone', 'Event', 'Other'], default: 'Other' },
  salesStage: { type: String, enum: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed'], default: 'Lead' },
  dealStatus: { type: String, enum: ['Won', 'Lost', 'Pending'], default: 'Pending' },
  expectedCloseDate: { type: Date },
  actualCloseDate: { type: Date },
  // Analytics Fields
  notes: { type: String },
  followUpDate: { type: Date },
  probabilityOfClosing: { type: Number, min: 0, max: 100 },
  competitorsInvolved: { type: String },
  reasonForLoss: { type: String },
  campaignName: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const SalesRecord = mongoose.model('SalesRecord', SalesRecordSchema);
export default SalesRecord;
