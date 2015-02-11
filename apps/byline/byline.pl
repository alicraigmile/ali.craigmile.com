#!/usr/bin/env perl

# Copyright 2015 Ali Craigmile

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

use strict;
use CGI;
use XML::Simple;

my $bylines = XMLin('bylines.xml', ForceArray=>1);
my $numberOfBylines = @{$bylines->{'byline'}};
my $randomIndex = int(rand($numberOfBylines));

my $randomByline = $bylines->{'byline'}[$randomIndex];

$randomByline =~ s{
        \{age:dob=(\d{4})(\d{2})(\d{2})\}
    }{
        age($3,$2,$1);
    }sexig;

sub age {
    # Assuming $birth_month is 0..11
    my ($birth_day, $birth_month, $birth_year) = @_;

    my ($day, $month, $year) = (localtime)[3..5];
    $year += 1900;

    my $age = $year - $birth_year;
    $age-- unless sprintf("%02d%02d", $month, $day)
               >= sprintf("%02d%02d", $birth_month, $birth_day);
    return $age;
}

print CGI::header(-type=>'text/html', -charset=>'UTF-8', -expires=>'+10s');
print "I am " . $randomByline . "\n";

