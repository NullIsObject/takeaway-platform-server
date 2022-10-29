export default function (): string {
	let random = String(Number.parseInt(String(Math.random() * 100000)))
	random = "0000" + random;
	random = random.slice(-5)
	return random
}