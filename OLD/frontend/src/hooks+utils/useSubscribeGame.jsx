/**
 * 1. takes -gameCode- and -currentUser.uid- as arguments
 * 2. subscribe game data (useState)
 * 3. subscribe private data (useState)
 * 
 * 
 * . useMemo to rerun main calculations only when moveNumber changes:
 * - calculate valid moves
 * - display opponents
 * - display history/text/info
 * 
 * . useMemo to rerun cup  - only when round changes
 * 
 * 
 * . exports -privateState(cup), -oppArray(with styling + right order + text, num of dice, if current(for enemy and self)),  
 */