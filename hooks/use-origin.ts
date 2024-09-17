function useOrigin() {
  const origin =
    typeof window !== "undefined" && window ? window.location.origin : "";

  return {
    origin,
  };
}

export default useOrigin;
