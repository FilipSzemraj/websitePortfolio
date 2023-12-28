import svgBackground_top from './images/svg_iceberg_top.svg';
import svgBackground_bottom from './images/svg_iceberg_bottom.svg';
import svgBackground from './images/svg_iceberg.svg';
import headerBackground from './images/header_background.jpeg';


const ContainerTop = {
    width: '100%',
    height:'70vh',
    backgroundImage: `url(${svgBackground_top})`,
    backgroundSize: 'cover',
    backgroundPosition:"bottom",
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: '3vh',
};

const ContainerBottom = {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${svgBackground_bottom})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "top",
    display: 'flex',
};

const Header = {
    width: '100%',
    height: '30vh',
    backgroundImage: `url(${headerBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
    overflow:"hidden",
};

const Body = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    
};
const NextSectionButton = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: '1.75vh',
    border:'0.25vh solid #3d3199 ',
};

const BodyWithoutHeader = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '170vh',
    backgroundImage: `url(${svgBackground})`,
    backgroundSize: 'cover',
    backgroundPosition:"top",
    backgroundRepeat: 'no-repeat',
};

const HeaderFirstRow = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '35%',
    width:"100%",
};

const mainHeaderContainer = {
    //display: 'flex',
    flexDirection:'row',
    height: '100%',
    width: '100%',
    

};

const DescContainer = {
    width: '100%',
    height: '65%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',


};

const Hidden = {
    visibility:'hidden',
};

const CardsContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
};


export const styles = {
    ContainerTop: ContainerTop,
    ContainerBottom: ContainerBottom,
    Body: Body,
    Header: Header,
    NextSectionButton: NextSectionButton,
    BodyWithoutHeader: BodyWithoutHeader,
    HeaderFirstRow: HeaderFirstRow,
    mainHeaderContainer: mainHeaderContainer,
    DescContainer: DescContainer,
    Hidden: Hidden,
    CardsContainer: CardsContainer,
}
