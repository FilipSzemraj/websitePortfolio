
const IconContainer = {
    /*display:'flex',
    justifyContent:'center',
    alignItems:'center',
    gap:'0.75vw',
    width:'100%',*/
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '.75vw',
    flex:'5',
    width:'100%',
}

const IconContainerSmallScreen = {
    display: 'flex',
    backgroundColor: '',
    justifyContent: 'space-between',
    alignItems:'center',
    width: '100%',
    minHeight: '10vh',
    //flex:'1',

}

const ContainerTop = {
    width: '100%',
    height:'50vh',
    background: "linear-gradient(to bottom, #0e4166 0%, #3a8bbf 100%)",
    scrollBehavior: "unset",

};


const ContainerBottom = {
    width: '100%',
    height: '300vh',
    backgroundColor:"#3a8bbf",
    display: 'flex', 
    overflow:'hidden',
    scrollBehavior: "unset",

};

const Header = {
};

const Body = {
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: "hidden",
    scrollBehavior: "unset",
};
const NextSectionButton = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: '1.75vh',
    border: '0.25vh solid #3d3199 ',
    borderColor:'#052c5c',
    margin:'3vh',
    scrollBehavior: "unset",
};

const mainHeaderContainer = {
    //display: 'flex',
    //flexDirection:'row',
    //height: '100%',
    //width: '100%',
    

};

const Hidden = {
    visibility:'hidden',
};

const CardsContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap:'0px',
    width:'100vw',
    height:'300vh',
};

const CardPair = {
    width:"100vw",
    height:'100vh',
    display:'flex',
    flexDirection:'column',
    position:'relative',
}

const Slide = {
    position: 'absolute',
    fontSize: '90px',
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
}

const Inner = {
    height: '50vh',
    width: '50vw',
    position: 'relative',
    display: 'flex',
    overflow:'hidden',
    flex: 1
}

const TechnologySectionWide = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '.75vw',
    flex:'5',
};

const TechnologySectionNarrow = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '.25vh',
    width: '100%',
    height: '12.5vh',
    flex:'5',
};

const TitleContainer = {
    color: '#f0f0f0',
    padding: '10px',
    flex:'1'
};
const ColoredDivs = {
    width: '5%',
    borderRadius: `15px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 25%',
    margin: '0.75vw',
};

const PathContainer = {
    display:'flex',
    width:'100%',
    height:'100%',
    justifyContent:"center",
    alignItems:'center',
}


export const styles = {
    ContainerTop: ContainerTop,
    ContainerBottom: ContainerBottom,
    Body: Body,
    Header: Header,
    NextSectionButton: NextSectionButton,
    mainHeaderContainer: mainHeaderContainer,
    Hidden: Hidden,
    CardsContainer: CardsContainer,
    IconContainer: IconContainer,
    IconContainerSmallScreen: IconContainerSmallScreen,
    CardPair: CardPair,
    Slide: Slide,
    Inner: Inner,
    TechnologySectionWide: TechnologySectionWide,
    TechnologySectionNarrow: TechnologySectionNarrow,
    TitleContainer: TitleContainer,
    coloredDivs: ColoredDivs,
    PathContainer:PathContainer,


}
