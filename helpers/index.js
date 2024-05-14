
export const modelosMaquineta = {
    1: 'MaquinaPoint',
    2: 'MaquinaPointTap',
};

export const slides = [
    {
        id: 1,
        img: require('../assets/point-landing2.png'),
        title: 'Maquineta Point',
        description: 'Simule as taxas para vendas com a maquininha Point para compras a vista e a prazo.',
        model: 'point',
        render: 'MaquinaPoint',
    },
    {
        id: 2,
        img: require('../assets/mercado-pago-point-tap.png'),
        title: 'Maquineta Point Tap',
        description: 'Simule as taxas para vendas com o Point Tap para compras a vista e a prazo.',
        model: 'pointTap',
        render: 'MaquinaPoint',
    }

]

export function objetoEstaNaLista(lista, objeto) {
    for (let item of lista) {
        let match = true;
        for (let key in objeto) {
            if (objeto[key] !== item[key]) {
                match = false;
                break;
            }
        }
        if (match) {
            return true;
        }
    }
    return false;
}

//
export const tipoPagamentoItemsPoint = {
    debito: [
        { label: 'À vista', value: 'avista', taxa: '1.99' }
    ],
    credito: [
        { label: 'À vista', value: 'avista', taxa: '2' },
        { label: 'Parcelado', value: 'parcelado', taxa: '3' }
    ]
};

export const parcelasItemsPoint = [
    { label: '2x', value: '2', taxa: '4.59' },
    { label: '3x', value: '3', taxa: '5.97' },
    { label: '4x', value: '4', taxa: '7.33' },
    { label: '5x', value: '5', taxa: '8.66' },
    { label: '6x', value: '6', taxa: '9.96' },
    { label: '7x', value: '7', taxa: '11.24' },
    { label: '8x', value: '8', taxa: '12.50' },
    { label: '9x', value: '9', taxa: '13.73' },
    { label: '10x', value: '10', taxa: '14.93' },
    { label: '11x', value: '11', taxa: '16.12' },
    { label: '12x', value: '12', taxa: '17.28' },
];

export const prazoItemsDebitoPoint = [
    { label: 'Agora', value: 'Agora', taxa: '1.99' },
];

export const prazoItemsPoint = [
    { label: 'Agora', value: 'Agora', taxa: '5.31' },
    { label: '14 dias', value: '14', taxa: '4.36' },
    { label: '30 dias', value: '30', taxa: '3.60' }
];

export const prazoItemsAVistaPoint = [
    { label: 'Agora', value: 'Agora', taxa: '4.98' },
    { label: '14 dias', value: '14', taxa: '3.79' },
    { label: '30 dias', value: '30', taxa: '3.03' }
];

//Em construção

export const tipoPagamentoItemsPointTap = {
    debito: [
        { label: 'À vista', value: 'avista', taxa: '1.29' }
    ],
    credito: [
        { label: 'À vista', value: 'avista', taxa: '2' },
        { label: 'Parcelado', value: 'parcelado', taxa: '3' }
    ]
};

export const prazoItemsDebitoPointTap = [
    { label: 'Agora', value: 'Agora', taxa: '1.29' },
];

export const prazoItemsAVistaPointTap = [
    { label: 'Agora', value: 'Agora', taxa: '3.15' },
    { label: '14 dias', value: '14', taxa: '3.10' },
    { label: '30 dias', value: '30', taxa: '3.05' }
];

export const prazoItemsPointTap = [
    { label: 'Agora', value: 'Agora', taxa: '3.98' },
    { label: '14 dias', value: '14', taxa: '3.88' },
    { label: '30 dias', value: '30', taxa: '3.78' }
];

export const parcelasItemsPointTap = [
    { label: '2x', value: '2', taxa: '2.01' },
    { label: '3x', value: '3', taxa: '2.31' },
    { label: '4x', value: '4', taxa: '3.17' },
    { label: '5x', value: '5', taxa: '4.01' },
    { label: '6x', value: '6', taxa: '4.81' },
    { label: '7x', value: '7', taxa: '5.61' },
    { label: '8x', value: '8', taxa: '6.41' },
    { label: '9x', value: '9', taxa: '7.21' },
    { label: '10x', value: '10', taxa: '8.01' },
    { label: '11x', value: '11', taxa: '8.81' },
    { label: '12x', value: '12', taxa: '9.51' },
];


export const direitos = 'Queremos esclarecer que nosso aplicativo não tem qualquer associação comercial ou parceria com as empresas de crédito relacionadas às maquininhas de pagamento mencionadas. Somos uma iniciativa independente, e os créditos do aplicativo são atribuídos exclusivamente aos seus autores. Agradecemos pela compreensão.';
