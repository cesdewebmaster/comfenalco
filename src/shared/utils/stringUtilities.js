
/*---------------------------------------------------------------------*/
/* normalizeTwoWords method returns a simplified and normalized 
	string joining two words of a given string.
	Eg.1:
		input: "1. Salón de Juegos" --> output: "1Salon"
	Eg.2:
		input: "Salón BBQ" --> output: "SalonBBQ"
	Eg.3:
		input: "Salud y cuidado" --> output: "Saludcuidado"
*/
export const normalizeTwoWords = (str) => {
	if (str) {
		let strArr = str.trim().split(" ")
		if (strArr.length > 1) {
			if (strArr.length >= 3) { 
				return normalizeCharacters(firstUpperOnly(strArr[0]).concat(firstUpperOnly(strArr[strArr.length-1]))) 
			} else {
				return normalizeCharacters(firstUpperOnly(strArr[0]).concat(firstUpperOnly(strArr[1])))
			}
		} else {
			return normalizeCharacters(str).trim()
		}
	} else {
		return ""
	}
}
/*---------------------------------------------------------------------*/

export const firstUpperOnly = (str) => {
	if (str) {
		return `${str.charAt(0).toUpperCase()}${str.length > 1 ? str.substring(1).toLowerCase() : ''}`;
	} else {
		return '';
	}
}

export const normalizeCharacters = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '')
}

export function camelize(str, upper, noAccent, alpha) {
	str = noAccent ? normalizeCharacters(str) : str
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+|[0-9]+)/g, function(match, index) {
		if (alpha && !isNaN(match)) return "" 
		if (+match === 0) return "" 
		return !upper && index === 0 ? match.toLowerCase() : match.toUpperCase()
	})
}

export const findTarget = (url) => {
   return url && url.startsWith('http') ?  '_blank' : '_self';
} 

export const findRel = (url) => {
   return url && url.startsWith('http') ?  'nofollow noreferrer' : 'follow';
} 
