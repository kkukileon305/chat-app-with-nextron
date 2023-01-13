type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return <h2 className='font-bold text-3xl text-center text-gray-600 mb-8'>{title}</h2>;
};
export default Title;
