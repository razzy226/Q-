type GoogleMapsLibrary = NonNullable<typeof window.google>;

let googleMapsPromise: Promise<GoogleMapsLibrary> | null = null;

export const loadGoogleMaps = (): Promise<GoogleMapsLibrary> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser."));
  }

  if (window.google?.maps?.importLibrary) {
    return Promise.resolve(window.google as GoogleMapsLibrary);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY;
  if (!key) {
    return Promise.reject(new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY."));
  }

  googleMapsPromise = new Promise<GoogleMapsLibrary>((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-js");
    if (existingScript) {
      existingScript.addEventListener("load", () =>
        resolve(window.google as GoogleMapsLibrary)
      );
      existingScript.addEventListener("error", () =>
        reject(new Error("Google Maps failed to load."))
      );
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&v=weekly&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google as GoogleMapsLibrary);
    script.onerror = () => reject(new Error("Google Maps failed to load."));
    document.head.appendChild(script);
  });

  return googleMapsPromise;
};
