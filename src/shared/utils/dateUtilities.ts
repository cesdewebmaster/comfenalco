const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const configDecimals = (valor: number) => {
   return valor >= 10 ? valor : '0' + valor;
};

export const getFormatDate = (text: string | number, mode: number = 0) => {
   if (!text) {
      return 'No Disponible';
   } else {
      const date = new Date(text);
      switch (mode) {
         case 0:
            return `${configDecimals(date.getDate())} de ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
         case 1:
            return `${configDecimals(date.getDate())}/${configDecimals(date.getMonth() + 1)}/${date.getFullYear().toString().substring(2)}`;
         case 2:
            return `${date.getDate()} ${MONTHS[date.getMonth()].substr(0, 3)}, ${date.getFullYear()}`;
         case 3:
            return `${date.getDate()} de ${MONTHS[date.getMonth()].toLowerCase()}`;
      }
   }
};


export const getDateMonth = (date: string) => {
   if (date) {
      return MONTHS[new Date(date).getMonth()];
   }
   return 'No Disponible';
};

export const getDiffDays = (dateOne: string, dateTwo: string) => {
   const date1 = new Date(dateOne);
   const date2 = new Date(dateTwo);
   const day = ((date2.getTime() - date1.getTime()) / 86400 / 1000);
   return Math.round(day) || Math.trunc(day);
};

export const getDateYear = (date: string) => {
   if (date) {
      return new Date(date).getFullYear().toString();
   }
   return 'No Disponible';
};
