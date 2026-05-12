// app/(tabs)/profile.js

import { Fonts } from "@/constants/theme";
import { useTranslation } from "@/hooks/useLanguage";
import { Logout } from "@/services/AuthService";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const router = useRouter();
  const { t, isRTL } = useTranslation();

  const handleLogout = async () => {
    const res = await Logout();
    console.log(res);
    if (res) {
      router.replace("/(auth)/login");
    } else {
      console.log(res);
    }
  };

  type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

  // 🔹 Reusable Menu Item
  const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
  }: {
    icon: IconName;
    title: string;
    subtitle: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[
        styles.menuItem,
        {
          flexDirection: isRTL ? "row-reverse" : "row",
        },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconBox,
          {
            marginRight: isRTL ? 0 : 10,
            marginLeft: isRTL ? 10 : 0,
          },
        ]}
      >
        <MaterialIcons name={icon} size={20} color="#1F5D2B" />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.menuTitle,
            {
              textAlign: isRTL ? "right" : "left",
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.menuSubtitle,
            {
              textAlign: isRTL ? "right" : "left",
            },
          ]}
        >
          {subtitle}
        </Text>
      </View>

      <MaterialIcons
        name={isRTL ? "chevron-left" : "chevron-right"}
        size={22}
        color="#999"
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={40} color="#555" />
        </View>

        <View style={styles.checkIcon}>
          <MaterialIcons name="check" size={16} color="#fff" />
        </View>
      </View>

      {/* Name */}
      <Text
        style={[
          styles.name,
          {
            textAlign: isRTL ? "right" : "left",
          },
        ]}
      >
        Allah Dino
      </Text>

      <Text
        style={[
          styles.email,
          {
            textAlign: isRTL ? "right" : "left",
          },
        ]}
      >
        alikhan2026@gmail.com
      </Text>

      {/* Settings */}
      <Text
        style={[
          styles.sectionTitle,
          {
            textAlign: isRTL ? "right" : "left",

            marginRight: isRTL ? 20 : 0,

            marginLeft: isRTL ? 0 : 20,
          },
        ]}
      >
        {t("profile.titleSettings")}
      </Text>

      <View style={styles.card}>
        <MenuItem
          icon="person-outline"
          title={t("profile.titleAccountInfo")}
          subtitle={t("profile.subTitleAccountInfo")}
          onPress={() => router.push("/settings/account")}
        />

        <MenuItem
          icon="security"
          title={t("profile.titleSecurity")}
          subtitle={t("profile.subTitleSecurity")}
          onPress={() => router.push("/settings/security")}
        />

        <MenuItem
          icon="support-agent"
          title={t("profile.titleHelpAndSupport")}
          subtitle={t("profile.subTitleHelpAndSupport")}
          onPress={() => router.push("/settings/help")}
        />
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={() => handleLogout()}
        style={[
          styles.logout,
          {
            flexDirection: isRTL ? "row-reverse" : "row",
          },
        ]}
      >
        <MaterialIcons name="logout" size={18} color="#D32F2F" />

        <Text
          style={[
            styles.logoutText,
            {
              marginLeft: isRTL ? 0 : 8,

              marginRight: isRTL ? 8 : 0,
            },
          ]}
        >
          {t("profile.logoutbtn")}
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text
        style={[
          styles.footer,
          {
            textAlign: isRTL ? "right" : "left",
          },
        ]}
      >
        Powerd By Verge Systems Pvt. Ltd.
      </Text>
    </ScrollView>
  );
};

export default Profile;

// 🎨 Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: "10%",
    paddingBottom: 40,
  },

  avatarWrapper: {
    marginTop: 10,
    position: "relative",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#EDEDED",
    justifyContent: "center",
    alignItems: "center",
  },

  checkIcon: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#1F5D2B",
    borderRadius: 10,
    padding: 4,
  },

  name: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: Fonts.sans,
    color: "#1F5D2B",
  },

  email: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  sectionTitle: {
    marginTop: 25,
    fontSize: 12,
    letterSpacing: 2,
    color: "#666",
    width: "90%",
  },

  card: {
    width: "90%",
    backgroundColor: "#f2f2f2eb",
    borderRadius: 12,
    marginTop: 10,
    paddingVertical: 5,
  },

  menuItem: {
    alignItems: "center",
    padding: 12,
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#E6EFE9",
    justifyContent: "center",
    alignItems: "center",
  },

  menuTitle: {
    fontSize: 14,
    fontFamily: Fonts.sans,
    color: "#1A1A1A",
  },

  menuSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  logout: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#F3EAEA",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "90%",
    justifyContent: "center",
  },

  logoutText: {
    color: "#D32F2F",
    fontFamily: Fonts.sans,
  },

  footer: {
    marginTop: 20,
    fontSize: 10,
    color: "#999",
  },
});
