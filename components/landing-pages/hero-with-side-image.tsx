import { LandingCTAButtons } from "./cta-buttons";
import { LandingDesktopMobileImage } from "./desktop-mobile-image";
import { Box, BoxProps, Flex, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import { Heading, Text } from "tw-components";

interface LandingHeroWithSideImageProps {
  title: string;
  titleWithGradient: string;
  subtitle: string;
  miniTitle?: string;
  trackingCategory: string;
  ctaText?: string;
  ctaLink: string;
  contactUsTitle?: string;
  noContactUs?: boolean;
  gradient: string;
  image?: StaticImageData;
  mobileImage?: StaticImageData;
  lottie?: {};
  miniImage?: StaticImageData;
  mt?: BoxProps["mt"];
}

export const LandingHeroWithSideImage: React.FC<
  LandingHeroWithSideImageProps
> = ({
  title,
  titleWithGradient,
  subtitle,
  miniTitle,
  trackingCategory,
  ctaText,
  ctaLink,
  contactUsTitle,
  noContactUs,
  gradient,
  image,
  mobileImage,
  lottie,
  miniImage,
  mt,
}) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap={{ base: 12, md: 8 }}
      mt={mt ?? { base: 4, md: 28 }}
    >
      <Flex flexDir="column" gap={{ base: 6, md: 8 }}>
        <Flex flexDir="column" gap={4}>
          <Flex gap={2} alignItems="center">
            {miniImage ? (
              <ChakraNextImage alt="" boxSize={7} src={miniImage} />
            ) : null}

            <Heading size="subtitle.sm" as="span">
              {miniTitle}
            </Heading>
          </Flex>
          <Heading as="h1" size="display.sm" px={{ base: 2, md: 0 }} mr={6}>
            {title}{" "}
            <Box as="span" bgGradient={gradient} bgClip="text">
              {titleWithGradient}
            </Box>
          </Heading>
        </Flex>
        <Text size="body.xl" mr={6}>
          {subtitle}
        </Text>
        <LandingCTAButtons
          ctaText={ctaText}
          ctaLink={ctaLink}
          contactUsTitle={contactUsTitle}
          noContactUs={noContactUs}
          trackingCategory={trackingCategory}
          alignLeft
        />
      </Flex>
      <Flex maxH="500px">
        <LandingDesktopMobileImage
          lottie={lottie}
          image={image}
          mobileImage={mobileImage}
        />
      </Flex>
    </SimpleGrid>
  );
};
