
echo "Build JudgeServer Images"
$current = `pwd`
cd ruby && docker build -t docker-judge-ruby ./ && cd $current
