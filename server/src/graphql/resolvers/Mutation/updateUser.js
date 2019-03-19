import { setUser, getUser } from '../../../helpers';

export default async function User(root, { user }, { ctx }, info) {
  // todo: 1 this throws a unfriendly (and potentially unsafe) error if a non-existnant user ID is entered.
  // how can we check for a non-existing user id and throw a more friendly error.

  // todo: 2 why is this update overwriting existing user data? Need to fix this so that just data input is
  // updated rather than overwritting all the data.
  if (!user.id) {
    return false
  }

  const userData = await getUser(user.id)
  if (!userData || !userData.id) {
    return false
  }
  const updateData = {
    ...userData,
    ...user,
  }
  await setUser(updateData);

  return true;
}
