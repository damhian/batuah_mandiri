import Lenis from 'lenis';

class LenisManager {
	private instance: Lenis | null = null;

	subscribe() {
		if (typeof window === 'undefined') return () => {};
		
		this.instance = new Lenis({
			autoRaf: true,
			lerp: 0.1,
			smoothWheel: true
		});

		// Basic RAF loop if autoRaf fails or for custom needs
		// But lenis 1.x autoRaf is usually enough.
		
		return () => {
			this.instance?.destroy();
			this.instance = null;
		};
	}

	destroy() {
		this.instance?.destroy();
		this.instance = null;
	}
}

export const lenis = new LenisManager();
