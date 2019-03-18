import userResolver from './Query/users'
import { getCompany } from '../../helpers';

export default {
  employees: async (root, args, { ctx }, info) => {
    const employees = userResolver(root, {company: root.id}, {ctx}, info)
    return employees;
  },
  address: async (root, args, { ctx }, info) => {
    const company = getCompany(root.id)
    return company.address
  }
};
