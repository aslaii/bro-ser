import React, { useState, useRef, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { WebView, WebViewNavigation } from "react-native-webview";
import { UrlInputCard } from "~/components/web-viewer/url-input-card";
import { WebViewerCard } from "~/components/web-viewer/web-viewer-card";
import { useNavigationHistory } from "~/lib/navigation-history";
import { useLocalSearchParams } from "expo-router";
import { formatUrl } from "~/lib/url-utils";

// eslint-disable-next-line react/function-component-definition
export default function Index() {
  const [ url, setUrl ] = useState("");
  const [ currentUrl, setCurrentUrl ] = useState("");
  const [ displayUrl, setDisplayUrl ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ progress, setProgress ] = useState(0);
  
  const webViewRef = useRef<WebView>(null);
  const { url: urlParam } = useLocalSearchParams<{ url?: string }>();
  
  const { 
    addUrl, 
    goBack, 
    goForward, 
    canGoBack, 
    canGoForward 
  } = useNavigationHistory();
  
  useEffect(() => {
    if (urlParam) {
      setUrl(urlParam);
      setCurrentUrl(urlParam);
      setDisplayUrl(urlParam);
    }
  }, [ urlParam ]);
  
  const handleSubmit = () => {
    if (!url.trim()) return;
    
    const formattedUrl = formatUrl(url.trim());
    
    setCurrentUrl(formattedUrl);
    setDisplayUrl(formattedUrl);
  };
  
  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    if (navState.url) {
      setDisplayUrl(navState.url);
      addUrl(navState.url);
    }
  };
  
  const handleGoBack = () => {
    const prevUrl = goBack();
    if (prevUrl) {
      setCurrentUrl(prevUrl);
      setDisplayUrl(prevUrl);
    } else {
      handleClearUrl();
    }
  };
  
  const handleGoForward = () => {
    const nextUrl = goForward();
    if (nextUrl && webViewRef.current) {
      setCurrentUrl(nextUrl);
      setDisplayUrl(nextUrl);
    }
  };
  
  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleClearUrl = () => {
    setUrl("");
    setCurrentUrl("");
    setDisplayUrl("");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <View className="p-4 flex-1">
        <UrlInputCard 
          url={url} 
          displayUrl={displayUrl}
          onUrlChange={setUrl} 
          onSubmit={handleSubmit}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          onRefresh={handleRefresh}
          onClearUrl={handleClearUrl}
          canGoBack={canGoBack()}
          canGoForward={canGoForward()}
        />
        
        <WebViewerCard
          url={currentUrl}
          loading={loading}
          progress={progress}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onLoadProgress={setProgress}
          onNavigationStateChange={handleNavigationStateChange}
          webViewRef={webViewRef}
        />
      </View>
    </SafeAreaView>
  );
}
