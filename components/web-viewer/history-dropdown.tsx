// components/web-viewer/history-dropdown.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Text } from "~/components/ui/text";
import { History } from "lucide-react-native";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
import { useNavigationHistory } from "~/lib/navigation-history";

iconWithClassName(History);

interface HistoryDropdownProps {
  onSelectUrl: (url: string) => void;
}

export function HistoryDropdown({ onSelectUrl }: HistoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getHistory } = useNavigationHistory();
  
  const history = getHistory();
  
  const handleSelectUrl = (url: string) => {
    onSelectUrl(url);
    setIsOpen(false);
  };
  
  return (
    <>
      <TouchableOpacity 
        onPress={() => setIsOpen(true)}
        className="p-2"
      >
        <History size={24} className="text-primary" />
      </TouchableOpacity>
      
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-card w-4/5 max-h-96 rounded-lg p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold">History</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text className="text-primary">Close</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView className="max-h-80">
              {history.length > 0 ? (
                history.map((url, index) => (
                  <TouchableOpacity 
                    key={index} 
                    onPress={() => handleSelectUrl(url)}
                    className="py-3 border-b border-border"
                  >
                    <Text className="text-foreground" numberOfLines={1}>{url}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="text-muted-foreground text-center py-4">
                  No browsing history yet
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
