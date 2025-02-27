interface CardProps {
    title: string;
    description?: string;
    preco: number;
    text: string;
    onClick: () => void;
}
const Card = ({ title, description = "Sem descrição", preco, text, onClick }: CardProps) => {
    return (
        <div className='w-52 px-2 py-4 rounded-2xl flex flex-col gap-5 shadow font-s'>
            <div className='w-full flex flex-col gap-3 px-2 py-1'>
            <h1 className='text-2xl w-full text-[#666666] font-semibold'>{title}</h1>
            <span className='text-xs text-[#666666]'>{description}</span>
            </div>

            <span className='text-3xl font-medium'>${preco}<span className='text-[#666666]'>/mo</span></span>

            <button className='bg-[#212121] px-3 py-2 rounded-4xl text-white cursor-pointer' onClick={onClick}>{text}</button>
        </div>
    )
}

export default Card;