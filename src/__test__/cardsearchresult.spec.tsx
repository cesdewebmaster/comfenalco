import { render } from "@testing-library/react";
import CardSearchResult from "../components/molecules/card-search-result/CardSearchResult";

describe('Pruebas <CardSearchResult />', () => {

    const itemResult = {
        entryId: "xaseedfeb",
        title: "Afilíate como independiente",
        description: "Texto de introducción rápida al servicio ofrecido para personas y familias o empresas",
        slug: '/afiliaciones/afiliacion-independiente',
        category: {
            name: "Afiliaciones",
            color: "#007B72"
        },
        miniatura: "//images.ctfassets.net/0s9sb7ld7kac/5TRR4gy7orEGamtOqRAjFN/6ea6749c55e08e60b0b8f0ff5d174236/afiliaciones.png"
    }

    test('should be match with snapshot', () => {
        const { container } = render(
            <CardSearchResult
                resultData={itemResult} />
        );

        expect(container).toMatchSnapshot();
    });
})
