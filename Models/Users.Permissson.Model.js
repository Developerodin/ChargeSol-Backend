import mongoose from 'mongoose';
 
  const userPermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
      },
      permissions: {
        Dashboard: {
          type: Boolean,
          default: false,
        },
        Overview: {
          type: Boolean,
          default: false,
        },
        Cpos: {
          type: Boolean,
          default: false,
        },
        Chargers: {
          type: Boolean,
          default: false,
        },
        ChargingStations: {
          type: Boolean,
          default: false,
        },
        StationLogs: {
            type: Boolean,
            default: false,
          },
        ChargerMap: {
            type: Boolean,
            default: false,
          },
        EVOwnersOverView: {
            type: Boolean,
            default: false,
          },
        UserList: {
            type: Boolean,
            default: false,
          },
        Complains: {
            type: Boolean,
            default: false,
          },
        PrivateChat: {
            type: Boolean,
            default: false,
          },
        BillingOverview: {
            type: Boolean,
            default: false,
          },
        AllTransactions: {
            type: Boolean,
            default: false,
          },
        CompanyPayouts: {
            type: Boolean,
            default: false,
          },
        DiscountCoupons: {
            type: Boolean,
            default: false,
          },
        AdminManagment: {
            type: Boolean,
            default: false,
          },
        AccessManagment: {
            type: Boolean,
            default: false,
          },
        SystemMasters: {
            type: Boolean,
            default: false,
          },
      },
  });
  
  export const UserPermission = mongoose.model('UserPermission', userPermissionSchema);