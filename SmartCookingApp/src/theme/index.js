export const COLORS = {
  background: '#121212',
  card: '#1E1E1E',
  primary: '#FF9800', // Premium Saffron
  secondary: '#FFB300',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  success: '#4CAF50',
  error: '#F44336',
  divider: '#333333',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  }
};

export const COMMON_STYLES = {
  card: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: 16,
    ...SHADOWS.card,
  },
  button: {
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }
};
