import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react-native";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";

iconWithClassName(ArrowLeft);
iconWithClassName(ArrowRight);
iconWithClassName(RefreshCw);

interface NavigationControlsProps {
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

export const NavigationControls = ({
  onGoBack,
  onGoForward,
  onRefresh,
  canGoBack = false,
  canGoForward = false,
}: NavigationControlsProps) => {
  return (
    <View className="flex-row space-x-4 items-center">
      <TouchableOpacity 
        onPress={onGoBack} 
        disabled={!canGoBack}
        className="p-2"
      >
        <ArrowLeft 
          size={24} 
          className={canGoBack ? "text-primary" : "text-muted-foreground opacity-50"} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={onGoForward} 
        disabled={!canGoForward}
        className="p-2"
      >
        <ArrowRight 
          size={24} 
          className={canGoForward ? "text-primary" : "text-muted-foreground opacity-50"} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={onRefresh}
        className="p-2"
      >
        <RefreshCw size={24} className="text-primary" />
      </TouchableOpacity>
    </View>
  );
};
