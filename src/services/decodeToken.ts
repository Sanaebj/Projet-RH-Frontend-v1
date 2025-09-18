// services/decodeToken.ts

// Typage du payload
export interface TokenPayload {
  sub: string;
  name?: string;
  role?: string;
  userId?: number;
  exp?: number;
  iat?: number;
  soldeConge?: number; // ✅ solde de congés
}

// Fonction pour décoder un token JWT sans librairie
export function decodeToken(token: string): TokenPayload {
  try {
    const payloadBase64 = token.split('.')[1]; // Récupère la 2ème partie (payload)
    const decodedPayload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')); // Décodage base64
    return JSON.parse(decodedPayload);
  } catch (err) {
    console.error('❌ Erreur lors du décodage du token :', err);
    throw new Error('Token invalide');
  }
}
