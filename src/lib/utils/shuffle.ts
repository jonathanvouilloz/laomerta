/**
 * Mélange sécurisé utilisant Fisher-Yates avec crypto.getRandomValues()
 * pour une meilleure randomisation
 */
export function secureShuffle<T>(array: T[]): T[] {
	const result = [...array];
	const length = result.length;

	for (let i = length - 1; i > 0; i--) {
		// Utiliser crypto pour une meilleure randomisation
		const randomBuffer = new Uint32Array(1);
		crypto.getRandomValues(randomBuffer);
		const j = randomBuffer[0] % (i + 1);

		// Échanger les éléments
		[result[i], result[j]] = [result[j], result[i]];
	}

	return result;
}

/**
 * Génère un ID unique
 */
export function generateId(): string {
	const buffer = new Uint8Array(8);
	crypto.getRandomValues(buffer);
	return Array.from(buffer)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}
