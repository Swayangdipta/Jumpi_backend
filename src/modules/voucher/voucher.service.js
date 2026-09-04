import ApiError from "../../utils/ApiError.js";

import {
  findVoucherHistory,
  countVoucherGroups,
  findVoucherDetails,
  findVoucherUsage
} from "./voucher.queries.js";

import {
  mapVoucherHistory,
  mapVoucherDetails
} from "./voucher.mapper.js";

import {
  findCustomerForDashboard
} from "../customer/customer.queries.js";


const getCustomer = async (customerId) => {
  const customer = await findCustomerForDashboard(customerId);

  if (!customer) {
    throw new ApiError(
      404,
      "Customer profile not found."
    );
  }

  return customer;
};


export const getVoucherHistory = async ({
  customerId,
  page,
  limit,
  offset
}) => {
  await getCustomer(customerId);

  const [vouchers, total] = await Promise.all([
    findVoucherHistory({
      customerId,
      limit,
      offset
    }),

    countVoucherGroups(customerId)
  ]);

  const totalPages =
    total === 0
      ? 0
      : Math.ceil(total / limit);

  return {
    vouchers: vouchers.map(mapVoucherHistory),

    pagination: {
      page,
      limit,
      total,
      totalPages,

      hasNextPage:
        page < totalPages,

      hasPreviousPage:
        page > 1
    }
  };
};


export const getVoucherDetails = async ({
  customerId,
  voucherNumber
}) => {
  await getCustomer(customerId);

  const rows = await findVoucherDetails({
    customerId,
    voucherNumber
  });

  if (!rows.length) {
    throw new ApiError(
      404,
      "Voucher not found."
    );
  }

  const voucherIds = rows.map(
    (row) => row.id
  );

  const usage = await findVoucherUsage(
    voucherIds
  );

  return mapVoucherDetails({
    rows,
    usage
  });
};