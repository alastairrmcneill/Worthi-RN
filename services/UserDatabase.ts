import AppUser from "@/models/AppUser";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export class UserDatabase {
  static async createUser(user: AppUser, provider: string): Promise<void> {
    const userDoc = await firestore()
      .collection("users")
      .doc(user.id ?? "")
      .get();

    if (!userDoc.exists) {
      await firestore()
        .collection("users")
        .doc(user.id ?? "")
        .set({
          ...user.toJSON(),
          provider: provider,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    }
  }
  static async getUserFromId(userId: string): Promise<AppUser | null> {
    try {
      const userDoc = await firestore().collection("users").doc(userId).get();

      if (!userDoc.exists) return null;

      return AppUser.fromJSON(userDoc.data());
    } catch (error) {
      console.log("Error fetching user:", error);
      return null;
    }
  }
}
