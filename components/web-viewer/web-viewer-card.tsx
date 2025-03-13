import React, { useState } from "react";
import { View, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

interface WebViewerCardProps {
  url: string;
  loading: boolean;
  progress: number;
  onLoadStart: () => void;
  onLoadEnd: () => void;
  onLoadProgress: (progress: number) => void;
  onNavigationStateChange: (event: any) => void;
  webViewRef: React.RefObject<WebView>;
}

export const WebViewerCard = ({
  url,
  loading,
  progress,
  onLoadStart,
  onLoadEnd,
  onLoadProgress,
  onNavigationStateChange,
  webViewRef,
}: WebViewerCardProps) => {
  const [ iframeError, setIframeError ] = useState(false);

  const handleIframeError = () => {
    setIframeError(true);
  };

  const renderWebContent = () => {
    if (!url) {
      return (
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-muted-foreground text-center">
            Enter a URL above to view a website
          </Text>
        </View>
      );
    }

    if (Platform.OS === 'web') {
      if (!iframeError) {
        // Try to use a regular iframe first
        return (
          <iframe
            src={url}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Web content"
            onError={handleIframeError}
            onLoad={(e) => {
              try {
                const frameContent = e.target.contentWindow.location.href;
              } catch (error) {
                handleIframeError();
              }
            }}
          />
        );
      }
      
      // Fallback if iframe had an error
      return (
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-muted-foreground text-center mb-4">
            This website cannot be displayed in the app due to security restrictions.
          </Text>
          <Button 
            onPress={() => window.open(url, '_blank')}
            className="text-primary-foreground mb-2"
          >
            Open in New Tab
          </Button>
        </View>
      );
    }

    // Use WebView for native platforms
    return (
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        className="flex-1"
        startInLoadingState={true}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onLoadProgress={({ nativeEvent }) => onLoadProgress(nativeEvent.progress)}
        onNavigationStateChange={onNavigationStateChange}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        renderLoading={() => (
          <View className="absolute inset-0 justify-center items-center bg-card">
            <Text className="text-muted-foreground">Loading...</Text>
          </View>
        )}
      />
    );
  };

  return (
    <>
      {loading && Platform.OS !== 'web' && (
        <View className="h-2 bg-muted rounded-full mb-4 overflow-hidden">
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </View>
      )}

      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-0 flex-1">
          {renderWebContent()}
        </CardContent>
      </Card>
    </>
  );
};
