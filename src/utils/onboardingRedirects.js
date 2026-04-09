import { getMyProfile } from "../api/profileApi";
import { getMyPreferences } from "../api/preferencesApi";

export const handleOnboardingRedirect = async (navigate) => {
  try {
    await getMyProfile();
  } catch (err) {
    navigate("/create-profile");
    return;
  }

  // try {
  //   await getMyPreferences();
  // } catch (err) {
  //   navigate("/preferences");
  //   return;
  // }

  navigate("/dashboard");
};
